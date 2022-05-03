package com.helpinghands.service.impl;

import com.helpinghands.entity.DonationItemEntity;
import com.helpinghands.model.ItemDto;
import com.helpinghands.model.ItemsRequestDto;
import com.helpinghands.repository.DonationItemRepository;
import com.helpinghands.service.AdminService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService  {

    @Autowired
    DonationItemRepository donationItemRepository;

    @Override
    public void allocateDonationItems(ItemsRequestDto itemsRequestDto) {
        List<ItemDto> itemList = itemsRequestDto.getItems();
        DonationItemEntity itemEntity;
        for(ItemDto itemDto: itemList){
            if(itemDto.getItemId() != null){
                itemEntity = donationItemRepository.getById(itemDto.getItemId());
                if(itemEntity != null){
                    BeanUtils.copyProperties(itemDto, itemEntity);
                }
                donationItemRepository.save(itemEntity);
            }
        }
    }
}
