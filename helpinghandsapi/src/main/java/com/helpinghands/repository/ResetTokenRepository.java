package com.helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helpinghands.entity.ResetToken;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {
	
	ResetToken findByToken(String token);

}
