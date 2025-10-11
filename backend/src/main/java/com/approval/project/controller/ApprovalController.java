package com.approval.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.approval.project.model.HistoryDTO;
import com.approval.project.model.ListDTO;
import com.approval.project.model.LoginDTO;
import com.approval.project.model.PageDTO;
import com.approval.project.model.ResDetailDTO;
import com.approval.project.model.ResponseDTO;
import com.approval.project.service.ApprovalServiceInter;


@RestController
@RequestMapping("approval")
public class ApprovalController {
	
	private final ApprovalServiceInter service;
	public ApprovalController(ApprovalServiceInter approvalService) {
		this.service = approvalService;
	}
	
	
	@PostMapping("/page")
	public ResponseDTO movePage(@RequestBody PageDTO pageDTO) {
		
		// 페이징 - 계산식 작성
		int curPage = pageDTO.getCurPage();
		int pageSize = pageDTO.getPageSize();
		int offset = (curPage - 1) * pageSize;
		pageDTO.setOffset(offset);
				
		List<ResDetailDTO> list = service.findAll(pageDTO);
		PageDTO resPageDTO = service.page(pageDTO);
		
		ResponseDTO resDTO = new ResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(resPageDTO);
		
		return resDTO;
	}
	
	@GetMapping("/findCount")
	public Map<String, Integer> findAllCount() {

		 int count = service.findAllCnt();
		  Map<String, Integer> result = new HashMap<>();
		  result.put("count", count);
		  return result;
	}
	
	
	
	// 로그인
	@PostMapping
	public Map<String, Object> tryLogin(@RequestBody Map<String, Object> inputUserInfo) {
		Map<String, Object> userInfo = service.tryLogin(inputUserInfo);

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", userInfo == null ? false : true);
		result.put("userInfo", userInfo);
				
		return result;
	}
	
	@GetMapping("/{num}") 
	public ResDetailDTO findDetail(@PathVariable int num) {
		ResDetailDTO dto = service.findDetail(num);
		return dto;
	 }
	
	// 결재등록
	@PostMapping("/create")
	public Map<String, Object> create(@RequestBody ListDTO dto) {
		int insert = service.create(dto);
		
		Map<String, Object> status = new HashMap<String, Object>();
		status.put("status", insert==0 ? false : true);
		return status;
	}

	@PutMapping("/update")
	public Map<String, Object> updateList(@RequestBody ListDTO dto) {
		int update = service.updateList(dto);
		
		Map<String, Object> status = new HashMap<String, Object>();
		status.put("status", update==0 ? false : true);
		return status;
	}
	
	// 결재이력 추가
	@PostMapping("/addhistory")
	public Map<String, Object> addhistory(@RequestBody HistoryDTO dto) {
		int insert = service.addhistory(dto);
		
		Map<String, Object> status = new HashMap<String, Object>();
		status.put("status", insert==0 ? false : true);
		return status;
	}
	
	//
	@GetMapping("/history/{docNum}") 
	public List<HistoryDTO> findHitsory(@PathVariable int docNum) {
		List<HistoryDTO> dto = service.findHitsory(docNum);
		return dto;
	}

}
