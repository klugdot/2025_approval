package com.approval.project.service;

import java.util.List;
import java.util.Map;

import com.approval.project.model.HistoryDTO;
import com.approval.project.model.ListDTO;
import com.approval.project.model.PageDTO;
import com.approval.project.model.ResDetailDTO;

public interface ApprovalServiceInter {

	List<ResDetailDTO> findAll(PageDTO pageDTO);
	PageDTO page(PageDTO pageDTO);
	int findAllCnt();

	// 로그인
	Map<String, Object> tryLogin(Map<String, Object> inputUserInfo);

	ResDetailDTO findDetail(int num);

	int create(ListDTO dto);
	
	int updateList(ListDTO dto);

	// 결재이력 추가
	int addhistory(HistoryDTO dto);
	
	List<HistoryDTO> findHitsory(int docNum);

}
