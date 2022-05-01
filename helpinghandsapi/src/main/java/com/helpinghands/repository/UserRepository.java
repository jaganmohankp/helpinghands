package com.helpinghands.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helpinghands.entity.User;

/**
 * 
 *
 * @version 1.0
 *
 */
public interface UserRepository extends JpaRepository<User, Long>{

	/**
	 * 
	 * @param username
	 * @return The user that has been found by JPA Repository's find by method
	 */
	User findByUsernameIgnoreCase(String username);

	/**
	 * 
	 * @param email
	 * @return The user that has been found by JPA Repository's find by method
	 */
	User findByEmailIgnoreCase(String email);
	
}
