import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import type { ChatUserList, MainBroadListResponse } from '../types';
import runWithConcurrency from '../utils/runWithConcurrency';

type ScopeJobParams = { id: string; selectValue: string; range: number };
export type ScopeJobResult = {
  scopeId: string[];
  broadList: {
    broad: MainBroadListResponse['broad'][0];
    chatUserList: ChatUserList;
  }[];
};

const useScopeJobMutation = () => {
  const [currentCount, setCurrentCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({
      id,
      selectValue,
      range,
    }: ScopeJobParams): Promise<ScopeJobResult> => {
      setCurrentCount(0);
      setTotalCount(0);

      const targetPageCount = Math.ceil(range / 60);
      let broadList: MainBroadListResponse['broad'] = [];

      for (
        let pageNo = 1;
        pageNo <= targetPageCount && broadList.length < range;
        pageNo += 1
      ) {
        const data = await window.electron.mainBroadList(
          selectValue === 'all'
            ? { selectType: 'action', selectValue: 'all', pageNo }
            : { selectType: 'cate', selectValue, pageNo, szActionType: 2 },
        );

        if (!data.broad.length) {
          break;
        }
        broadList = [...broadList, ...data.broad];
      }
      broadList = broadList.slice(0, range);

      setTotalCount(broadList.length);

      const tasks = broadList.map((broad) => async () => {
        try {
          const chatUserList = await window.electron.chatUserList(
            broad.user_id,
          );
          return { broad, chatUserList };
        } catch (error) {
          console.error('chatUserList error', broad.user_id, error);
          return { broad, chatUserList: [] };
        } finally {
          setCurrentCount((prev) => prev + 1);
        }
      });
      const resultList = await runWithConcurrency(tasks, 5);

      return {
        scopeId: [...new Set(id.split(',').map((item) => item.trim()))],
        broadList: resultList,
      };
    },
  });

  return { ...mutation, currentCount, totalCount };
};

export default useScopeJobMutation;
