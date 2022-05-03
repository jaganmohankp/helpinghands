package com.helpinghands.repository;

import com.helpinghands.entity.DonationItemEntity;
import com.helpinghands.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 *
 * @version 1.0
 *
 */
public interface DonationItemRepository extends JpaRepository<DonationItemEntity, Long>{


	
}
