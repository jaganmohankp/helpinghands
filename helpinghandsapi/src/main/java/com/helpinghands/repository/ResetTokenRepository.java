package com.helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helpinghands.entity.ResetTokenEntity;

public interface ResetTokenRepository extends JpaRepository<ResetTokenEntity, Long> {
	
	ResetTokenEntity findByToken(String token);

}
