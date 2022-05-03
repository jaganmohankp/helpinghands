package com.helpinghands.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helpinghands.entity.UserEntity;

/**
 * 
 *
 * @version 1.0
 *
 */
public interface UserRepository extends JpaRepository<UserEntity, Long>{

	/**
	 * 
	 * @param username
	 * @return The user that has been found by JPA Repository's find by method
	 */
	UserEntity findByUsernameIgnoreCase(String username);

	/**
	 * 
	 * @param email
	 * @return The user that has been found by JPA Repository's find by method
	 */
	UserEntity findByEmailIgnoreCase(String email);
	
}
