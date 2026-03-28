import { SoopChatEvent, SoopClient } from 'soop-extension';

const SEPARATOR = '\x0c';

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

const parseExit = (packet) => {
  const parts = packet.toString().split(SEPARATOR);
  const [, , ...data] = parts;
  return chunk(data, 3)
    .slice(0, -1)
    .map((item) => ({
      userId: item[0].replace(/\(\d\)$/, ''),
      username: item[1],
    }));
};

export const handleChatUserList = (_event, streamerId) => {
  console.log('call handleChatUserList', streamerId);
  const client = new SoopClient();
  const soopChat = client.chat({ streamerId });
  let userList = [];
  let done = false;

  return new Promise((resolve) => {
    const finish = async () => {
      if (done) {
        return;
      }
      done = true;
      clearTimeout(timer);
      await soopChat.disconnect();
      resolve(userList);
    };

    const timer = setTimeout(finish, 3000); // 안전장치

    // row 데이터 직접 받아서 분석
    soopChat.on(SoopChatEvent.RAW, (packet) => {
      const messageType = packet.toString().substring(2, 6);
      switch (messageType) {
        case '0004': // 채팅 접속 시 이 타입으로 시청자 목록이 옴
          userList = [...userList, ...parseExit(packet)]; // 시청자가 많을 경우 여러번 나눠서 옴
          break;

        case '0110': // 시청자 목록을 다 받으면 이 타입이 옴
          finish();
          break;
      }
    });

    // Connect to chat
    soopChat.connect();
  });
};

export const handleMainBroadList = async (_event, params) => {
  console.log('call handleMainBroadList', params);
  const { selectType, selectValue, pageNo, szActionType } = params;
  const response = await fetch(
    `https://live.sooplive.com/api/main_broad_list_api.php?selectType=${selectType}&selectValue=${selectValue}&orderType=view_cnt&pageNo=${pageNo}&strmLangType=ko_KR&lang=ko_KR&szActionType=${szActionType ?? ''}`,
  );
  return await response.json();
};
