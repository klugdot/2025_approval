package com.approval.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.approval.project.model.HistoryDTO;
import com.approval.project.model.ListDTO;
import com.approval.project.model.LoginDTO;
import com.approval.project.model.PageDTO;
import com.approval.project.model.ResDetailDTO;

@Mapper
public interface ApprovalMapper {
	// 결재목록
	List<ResDetailDTO> findAll(PageDTO pageDTO);

	// 로그인
	Map<String, Object> tryLogin(Map<String, Object> inputUserInfo);

	int findAllCnt();
	
	// 상세보기
	ResDetailDTO findDetail(int num);

	int create(ListDTO dto);

	int updateList(ListDTO dto);
	
	// 결재이력 추가
	int addhisroty(HistoryDTO dto);

	List<HistoryDTO> findHitsory(int docNum);

	// 사용자별 갯수 구하기
	int findCnt(PageDTO pageDTO);

}
