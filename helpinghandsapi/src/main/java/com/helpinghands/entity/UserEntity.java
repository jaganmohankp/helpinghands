package com.helpinghands.entity;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * 
 *
 * @version 1.0
 *
 */
@Entity
@Table(name = "user")
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE, region = "user_cache")
public class UserEntity {
	
	/**
	 * The identifier that will be created automatically by the database's sequence generator as defined
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
	@SequenceGenerator(initialValue = 1, allocationSize = 1, name = "user_seq_gen", sequenceName = "user_sequence")
	@Column(name = "id", nullable = false)
	private Long userId;
	
	/**
	 * The username is a unique identifier that helps in differentiating between different User objects
	 */
	@Column(unique = true)
	private String username;
	
	/**
	 * The password will allow the client to accurately identify if the user has the right credentials to log-in
	 */
	private String password;

	/**
	 * The email address of the user/organization
	 */
	@Column(unique = true)
	private String email;

	private String role;
	

	/**
	 * Empty constructor that should not be initialized in most cases
	 * Required for Spring injection
	 */
	protected UserEntity() {}
	
	/**
	 * Constructor that generates a user object
	 * @param username
	 * @param password
	 * @param email
	 * @param email
	 */
	public UserEntity(String username, String password, String email, String role) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
	}

	/**
	 * @return Returns the unique generated identifier of the user object
	 */
	public Long getUserId() {
		return userId;
	}
	
	/**
	 * Sets the unique generated identifier of the user object, should not be used in most instances
	 * @param id
	 */
	public void setUserId(Long id) {
		this.userId = userId;
	}
	
	/**
	 * 
	 * @return Returns the username of the user object
	 */
	public String getUsername() {
		return username;
	}
	
	/**
	 * Sets the username of the user object, should not be used in most instances
	 * @param username
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/**
	 * 
	 * @return Returns the password of the user object
	 */
	public String getPassword() {
		return password;
	}
	
	/**
	 * Sets the password of the user object, mainly used in account management functions (e.g. reset password)
	 * @param password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * 
	 * @return Returns the email address of the usr object
	 */
	public String getEmail() {
		return email;
	}
	
	/**
	 * Sets the email of the user object, mainly used in account management functions (e.g. update user)
	 * @param email
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
