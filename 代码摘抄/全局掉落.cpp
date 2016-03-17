//使用ACE 框架
//配置表数据范例
/**
<drop>
    <id>13403003</id>
    <name>周一副本3</name>
    <rate>0.05</rate>
    <drop_list>13404001,0.6;13404004,0.4;13404007,-0.5;1310110A,-0.5;</drop_list>
</drop>
**/
#define MAX_GLOBAL_DROP_COUNT 16
#define MAX_DROP_ENTITY_PER_LIST 128
typedef struct tagDropEntityInfo
{
    ACE_UINT32 unResID;
    float fRate;
}DropEntityInfo;

typedef struct tagDropGroup
{
    ACE_UINT32 unGlobalDropID;
    ACE_UINT32 unGlobalCount;
    DropEntityInfo globalList[MAX_GLOBAL_DROP_COUNT];
    ACE_UINT32 unCount;
    DropEntityInfo list[MAX_DROP_ENTITY_PER_LIST];
}DropGroup;

typedef struct tagGlobalLootInfo
{
    int lootFlag[125];
    int nCursor;
    int nHitCount;
    DropGroup dropGroup;
}GlobalLootInfo;

typedef ACE_Hash_Map_Manager_Ex<ACE_UINT32, GlobalLootInfo *, ACE_Hash<ACE_UINT32>, 
ACE_Equal_To<ACE_UINT32>, ACE_Null_Mutex> GLOBAL_LOOT_MAP;


//创建掉落数据结构

ACE_UINT32 GlobalLootMgr::create_global_drop(float rate, ACE_UINT32 unCount, DropEntityInfo *list)
{
    if(unCount <= 0)
    {
        return 0;
    }

    //rate 对应配置表的rate,
    int t = (int)(rate * 1000);

    if(t <= 0)
    {
        return 0;
    }
    if(t > 1000)
    {
        t = 1000;
    }

    GlobalLootInfo *info = new GlobalLootInfo();

    if(info == NULL)
    {
        return 0;
    }

    ACE_OS::memset(info, 0, sizeof(GlobalLootInfo));

    ACE_UINT32 ret = m_unCurrentID;

    if(m_lootMap.bind(ret, info) != 0)
    {
        delete info;
        return 0;
    }

    info->nHitCount = t;

    info->dropGroup.unCount = unCount;

    int i;
    for(i = 0;i < unCount;i ++)
    {
        info->dropGroup.list[i] = list[i];
    }

    //设置掉落概率
    reset(info);


    m_unCurrentID ++;

    return ret;
    
}


void GlobalLootMgr::reset(GlobalLootInfo *info)
{
    ACE_OS::memset(info->lootFlag, 0, sizeof(int) * 125);
    info->nCursor = 0;

    int c = 1000;
    int pos = 0;
    int tmp_c = info->nHitCount;

    if(info->nHitCount > 0)
    {
        int count = 1000 / tmp_c;

        int i = 0;
        //概率越大,循环循环的次数越多,能够获取的几率越大
        for(i = 0;i < tmp_c;i ++)
        {
            //分段赋值
            pos = i * count + ACE_OS::rand() % count;

            int idx = pos >> 3;     //pos的取值范围从0到1000, 除以8符合lootFlag的索引最大值 125
            int shift = pos & 0x7;  //shift为 2的指数, 即是 1 << shift, 最大为2^7 = 128,

            info->lootFlag[idx] = info->lootFlag[idx] | (1 << shift);  //将flag赋值,为其基础值和(|)某个随机值
        }
    }
}



//掉落计算, nCount 给计算的次数
ACE_UINT32 GlobalLootMgr::loot(DropGroup &group, int nCount)
{
    int i;
    int c = nCount;

    GlobalLootInfo *lootInfo = NULL;

    if(group.unGlobalDropID != 0)
    {
        if(m_lootMap.find(group.unGlobalDropID, lootInfo) == 0)
        {
            c = nCount;
            while(c > 0)
            {
                if(global_loot(lootInfo))
                {
                    return get_drop(lootInfo->dropGroup);
                }
                c --;
            }
        }
    }  

    return get_drop(group);
}


bool GlobalLootMgr::global_loot(GlobalLootInfo *lootInfo)
{
    /*
    GlobalLootInfo *info = NULL;

    if(m_lootMap.find(unID, info) != 0)
    {
        return false;
    }
    */

    bool ret = false;

    //int idx = info->nCursor / 8;
    //int shift = info->nCursor % 8;

    //和上面注释等价, 这里除以8, 是只取flag的125个中的前15个么
    int idx = lootInfo->nCursor >> 3;
    int shift = lootInfo->nCursor & 0x7;

    //这一行不是很懂,当为奇数的时候取值么
    if(((lootInfo->lootFlag[idx] >> shift) & 0x01) != 0)
    {
        ret = true;
    }

    lootInfo->nCursor ++;

    if(lootInfo->nCursor >= 1000)
    {
        reset(lootInfo);
    }

    return ret;
}


ACE_UINT32 GlobalLootMgr::get_drop(DropGroup &group)
{
    ACE_UINT32 ret = 0;

    ACE_UINT32 t = ACE_OS::rand() % 1000;
    ACE_UINT32 c = 0;

    for(int i = 0;i < group.unCount;i ++)
    {
        c += (int)(group.list[i].fRate * 1000);

        if(t < c)
        {
            ret = group.list[i].unResID;
            break;
        }
    }

    if(ret == 0)
    {
        if(group.unCount > 0)
        {
            ret = group.list[group.unCount - 1].unResID;
        }
        else
        {
            return 0;
        }

    }

    int type = GET_ITEM_TYPE(ret);

    if(type == ITEM_RES_TYPE_DROP)
    {
        DropRes *res = (DropRes *)ITEM_RES_MGR_INSTANCE::instance()->get_item_res(ret);
        if(res == NULL)
        {
            return 0;
        }
        //表是递归编写的
        ret = get_drop(res->m_dropGroup);
    }

    return ret;
}