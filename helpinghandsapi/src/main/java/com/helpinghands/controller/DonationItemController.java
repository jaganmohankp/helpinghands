package com.helpinghands.controller;

import com.helpinghands.model.ItemsRequestDto;
import com.helpinghands.service.DonationItemService;
import com.helpinghands.util.MessageConstants;
import com.helpinghands.util.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class DonationItemController {

    @Autowired
    DonationItemService donationItemService;

    @PostMapping("/userauth/myitempost")
    public ResponseDTO addDonation(@RequestBody ItemsRequestDto request) {
        ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.DONATION_ITEMS_CREATE_SUCCESS);
        try {
            donationItemService.createOrUpdateDonationItems(request);
        } catch (Exception e) {
            responseDTO.setStatus(ResponseDTO.Status.FAIL);
            responseDTO.setMessage(e.getMessage());
        }
        return responseDTO;
    }

    @PostMapping("/userauth/myitemrequest")
    public ResponseDTO requestDonations(@RequestBody ItemsRequestDto request) {
        ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.REQUEST_CREATE_SUCCESS);
        try {
            donationItemService.requestDonationItems(request);
        } catch (Exception e) {
            responseDTO.setStatus(ResponseDTO.Status.FAIL);
            responseDTO.setMessage(e.getMessage());
        }
        return responseDTO;
    }
}
