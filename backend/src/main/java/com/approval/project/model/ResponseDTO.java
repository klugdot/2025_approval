package com.approval.project.model;

import java.util.List;

public class ResponseDTO {
	
	private List<ResDetailDTO> list;
	private PageDTO page;
	
	

	public List<ResDetailDTO> getList() {
		return list;
	}
	public void setList(List<ResDetailDTO> list) {
		this.list = list;
	}
	public PageDTO getPage() {
		return page;
	}
	public void setPage(PageDTO page) {
		this.page = page;
	}


}
