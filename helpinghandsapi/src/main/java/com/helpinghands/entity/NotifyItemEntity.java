package com.helpinghands.entity;

import javax.persistence.*;

@Entity
@Table(name = "notify_item")
public class NotifyItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notify_item_seq_gen")
    @SequenceGenerator(initialValue = 1, allocationSize = 1, name = "notify_item_seq_gen", sequenceName = "notify_item_sequence")
    @Column(name = "id", nullable = false)
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
