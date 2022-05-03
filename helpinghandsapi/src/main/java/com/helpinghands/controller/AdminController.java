package com.helpinghands.controller;

import com.helpinghands.model.ItemsRequestDto;
import com.helpinghands.service.AdminService;
import com.helpinghands.util.MessageConstants;
import com.helpinghands.util.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/userauth/adminitemallocation")
    public ResponseDTO requestDonations(@RequestBody ItemsRequestDto request) {
        ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.REQUEST_CREATE_SUCCESS);
        try {
            adminService.allocateDonationItems(request);
        } catch (Exception e) {
            responseDTO.setStatus(ResponseDTO.Status.FAIL);
            responseDTO.setMessage(e.getMessage());
        }
        return responseDTO;
    }
}
