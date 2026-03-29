export type ChatUserList = { userId: string; username: string }[];

export type MainBroadListParams = {
  selectType: 'cate' | 'action';
  selectValue: string;
  pageNo: number;
  szActionType?: 2;
};

export type MainBroadListResponse = {
  total_cnt: string; // "403"
  cnt: number; // 60
  broad: {
    broad_no: string; // "292735297"
    parent_broad_no: string; // "0"
    user_id: string; // "haroha"
    user_nick: string; // "하로하!"
    broad_title: string; // "심해로 떠날 잠수팟 구해요 - 서브노티카1"
    broad_thumb: string; // "//liveimg.sooplive.com/m/292735297?575"
    broad_start: string; // "2026-03-27 15:29:36"
    broad_grade: string; // "0"
    broad_bps: string; // "8000"
    broad_resolution: string; // "1920x1080"
    visit_broad_type: string; // "1"
    broad_type: string; // "21"
    station_name: string; // "하로하"
    broad_memo: string; // ""
    current_view_cnt: string; // "192"
    m_current_view_cnt: string; // "53"
    allowed_view_cnt: string; // "100000"
    is_password: string; // "N"
    rank: string; // "0"
    broad_cate_no: string; // "00810000"
    total_view_cnt: string; // "245"
    pc_view_cnt: string; // "192"
    mobile_view_cnt: string; // "53"
    is_drops: number; // 0
    auto_hashtags: [];
    subscription_only: string; // "0"
    strm_lang_type: string; // "ko_KR"
    category_tags: string[]; // ["버추얼"]
    category_name: string; // "버추얼"
    hash_tags: string[]; // ["블루점프", "노래"]
    lang_tags: string[]; // ["한국어"]
  }[];
  time: number; // 1774619836
  is_wp: [];
};

export type CategoryList = { label: string; value: string }[];
