package com.helpinghands.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.helpinghands.entity.UserEntity;
import com.helpinghands.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtValidator {

	private String secret = "helpinghands";
	
	@Autowired
	private UserRepository userRepository;
	
	/*
	public JwtUser validate(String token) {
		// TODO Auto-generated method stub
		JwtUser jwtUser = null;
		try {
			Claims body = Jwts.parser()
					.setSigningKey(secret)
					.parseClaimsJws(token)
					.getBody();
			jwtUser = new JwtUser();
			jwtUser.setUsername(body.getSubject());
			jwtUser.setId(Long.valueOf((String)body.get("userId")));
			jwtUser.setRole((String)body.get("role"));
		} catch (Exception e) {
			// Need proper error handling here
			System.out.println(e.getStackTrace());
		}
		return jwtUser;
	}
	*/
	
	public UserEntity validateUser(String token) {
		UserEntity userEntity = null;
		try {
			Claims body = Jwts.parser()
					.setSigningKey(secret)
					.parseClaimsJws(token)
					.getBody();
			userEntity = userRepository.findByUsernameIgnoreCase(body.getSubject());
		} catch (Exception e) {
			System.out.println(e.getStackTrace());
		}
		return userEntity;
	}

}
