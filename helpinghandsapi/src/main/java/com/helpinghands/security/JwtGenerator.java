package com.helpinghands.security;

import java.time.ZonedDateTime;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.helpinghands.model.LoginRequestDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtGenerator {

	/*
	public String generate(JwtUser jwtUser) {
		// TODO Auto-generated method stub
		Claims claims = Jwts.claims()
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(Long.valueOf(2)).toInstant()))
				.setSubject(jwtUser.getUsername());
		claims.put("userId", String.valueOf(jwtUser.getId()));
		claims.put("role", jwtUser.getRole());
		return Jwts.builder()
				.setClaims(claims)
				.signWith(SignatureAlgorithm.HS512, "helpinghands")
				.compact();
	}
	*/
	
	public String generateToken(LoginRequestDto login, String userRole) {
		Claims claims = Jwts.claims()
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(Long.valueOf(120)).toInstant()))
				.setSubject(login.getUsername());
		//claims.put("userId", String.valueOf(1L));
		claims.put("role", userRole);
		return Jwts.builder()
				.setClaims(claims)
				.signWith(SignatureAlgorithm.HS512, "helpinghands")
				.compact();
	}

}
