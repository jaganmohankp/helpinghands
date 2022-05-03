package com.helpinghands.service.impl;

import com.helpinghands.entity.DonationItemEntity;
import com.helpinghands.model.ItemDto;
import com.helpinghands.model.ItemsRequestDto;
import com.helpinghands.repository.DonationItemRepository;
import com.helpinghands.service.DonationItemService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationItemServiceImpl implements DonationItemService  {

    @Autowired
    DonationItemRepository donationItemRepository;

    @Override
    public void createOrUpdateDonationItems(ItemsRequestDto itemsRequestDto) {
        List<ItemDto> itemList = itemsRequestDto.getItems();
        DonationItemEntity itemEntity;
        for(ItemDto itemDto: itemList){
            if(itemDto.getItemId() != null){
                itemEntity = donationItemRepository.getById(itemDto.getItemId());
                if(itemEntity != null){
                    BeanUtils.copyProperties(itemDto, itemEntity);
                } else {
                    itemEntity = new DonationItemEntity();
                    BeanUtils.copyProperties(itemDto, itemEntity);
                }
                donationItemRepository.save(itemEntity);
            } else {
                itemEntity = new DonationItemEntity();
                BeanUtils.copyProperties(itemDto, itemEntity);
                donationItemRepository.save(itemEntity);
            }
        }
    }

    @Override
    public void requestDonationItems(ItemsRequestDto itemsRequestDto) {
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
