// ===============================================================
//  설정 파일 — 배포 전에 이 파일만 고치면 됩니다.
// ===============================================================
window.APP_CONFIG = {
  // 숙명여고 수업 때 만든 Supabase 프로젝트를 그대로 씁니다. (방만 새로 추가)
  // 다른 프로젝트를 쓰려면 Project Settings > API 에서 복사해 바꾸세요.
  SUPABASE_URL: 'https://qwlftpqwtmpbzmuuncue.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_kUgY92bUKR7Y_kbBYi5Jlw_owp_4QFm',

  // 수업 방 이름 (supabase/add-room-dunchon.sql 의 값과 같게)
  ROOM_ID: 'dunchon',

  // 데모 모드(주소 뒤 ?demo=1)에서만 쓰는 교사 코드
  DEMO_TEACHER_CODE: 'teacher',

  STUDENT_VIDEO: false,

  // 주소창에 보이는 이름 (꾸밈용)
  DISPLAY_HOST: 'ai-paper.class',
};
