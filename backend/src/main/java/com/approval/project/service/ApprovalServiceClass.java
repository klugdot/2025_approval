package com.approval.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.approval.project.model.HistoryDTO;
import com.approval.project.model.ListDTO;
import com.approval.project.model.LoginDTO;
import com.approval.project.model.PageDTO;
import com.approval.project.model.ResDetailDTO;
import com.approval.project.repository.ApprovalMapper;


@Service
public class ApprovalServiceClass implements ApprovalServiceInter {

	public final ApprovalMapper mapper;
	public ApprovalServiceClass(ApprovalMapper mapper) {
		this.mapper = mapper;
	}
	
	
	@Override
	public List<ResDetailDTO> findAll(PageDTO pageDTO) {
		// TODO Auto-generated method stub	
		return mapper.findAll(pageDTO);
	}
	
	@Override
	public PageDTO page(PageDTO pageDTO) {
		// TODO Auto-generated method stub
//		int count = mapper.findAllCnt();
		int count = mapper.findCnt(pageDTO);
		
		int curPage = pageDTO.getCurPage();
		int pageSize = pageDTO.getPageSize();
		int blockSize = 5;  // 블럭 사이즈 늘어나면 여기를 바꿔준다.
		
		
		int totalPages = (int) Math.ceil(count / (double)pageSize);
		int currentBlock = (int) Math.ceil((double)curPage / blockSize);
		
		int blockStart = (currentBlock - 1) * blockSize + 1;
		int blockEnd = Math.min(currentBlock * blockSize, Math.max(totalPages, 1));
		
		
		PageDTO resPageDTO = new PageDTO();
		resPageDTO.setBlockSize(blockSize);
		resPageDTO.setCurPage(curPage);
		resPageDTO.setPageSize(pageSize);
		resPageDTO.setCount(count);
		resPageDTO.setTotalPages(totalPages);
		resPageDTO.setCurrentBlock(currentBlock);
		resPageDTO.setBlockStart(blockStart);
		resPageDTO.setBlockEnd(blockEnd);
		resPageDTO.setOffset(pageDTO.getOffset());
		
		return resPageDTO;
	}

	@Override
	public int findAllCnt() {
		// TODO Auto-generated method stub
		return mapper.findAllCnt();
	}

	// 로그인
	@Override
	public Map<String, Object> tryLogin(Map<String, Object> inputUserInfo) {
		// TODO Auto-generated method stub
		return mapper.tryLogin(inputUserInfo);
	}

	// 상세보기
	@Override
	public ResDetailDTO findDetail(int num) {
		// TODO Auto-generated method stub	
		
		return mapper.findDetail(num);
	}

	// 결재등록
	@Override
	public int create(ListDTO dto) {
		// TODO Auto-generated method stub
		return mapper.create(dto);
	}

	@Override
	public int updateList(ListDTO dto) {
		// TODO Auto-generated method stub
		return mapper.updateList(dto);
	}
	
	// 결재이력 추가
	@Override
	public int addhistory(HistoryDTO dto) {
		// TODO Auto-generated method stub
//		mapper.updateList(dto);
		return mapper.addhisroty(dto);
	}


	@Override
	public List<HistoryDTO> findHitsory(int docNum) {
		// TODO Auto-generated method stub
		return mapper.findHitsory(docNum);
	}





	
}
