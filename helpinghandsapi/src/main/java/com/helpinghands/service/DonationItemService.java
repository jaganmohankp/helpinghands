package com.helpinghands.service;

import com.helpinghands.model.ItemDto;
import com.helpinghands.model.ItemsRequestDto;

import java.util.List;

public interface DonationItemService {

    void createOrUpdateDonationItems(final ItemsRequestDto itemsRequestDto);

     void requestDonationItems(ItemsRequestDto itemsRequestDto);
}
