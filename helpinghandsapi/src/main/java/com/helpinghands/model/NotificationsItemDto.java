package com.helpinghands.model;

public class NotificationsItemDto {

    private Long notifyId;
    private String donorname;
    private String recievername;
    private String itemname;
    private String adminapproval;
    private String status;

    public Long getNotifyId() {
        return notifyId;
    }

    public void setNotifyId(Long notifyId) {
        this.notifyId = notifyId;
    }

    public String getDonorname() {
        return donorname;
    }

    public void setDonorname(String donorname) {
        this.donorname = donorname;
    }

    public String getRecievername() {
        return recievername;
    }

    public void setRecievername(String recievername) {
        this.recievername = recievername;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }

    public String getAdminapproval() {
        return adminapproval;
    }

    public void setAdminapproval(String adminapproval) {
        this.adminapproval = adminapproval;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
