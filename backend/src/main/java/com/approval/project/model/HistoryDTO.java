package com.approval.project.model;

import java.sql.Date;

public class HistoryDTO {
	
	private int hisNum;
	private int approvalNum;
	private String procId;
	private String positionCd;
	private String statusCode;
	private Date hisRegDate;
	
	
	public int getHisNum() {
		return hisNum;
	}
	public void setHisNum(int hisNum) {
		this.hisNum = hisNum;
	}
	public int getApprovalNum() {
		return approvalNum;
	}
	public void setApprovalNum(int approvalNum) {
		this.approvalNum = approvalNum;
	}
	public String getProcId() {
		return procId;
	}
	public void setProcId(String procId) {
		this.procId = procId;
	}
	public String getPositionCd() {
		return positionCd;
	}
	public void setPositionCd(String positionCd) {
		this.positionCd = positionCd;
	}
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	public Date getHisRegDate() {
		return hisRegDate;
	}
	public void setHisRegDate(Date hisRegDate) {
		this.hisRegDate = hisRegDate;
	}
	
	

}
