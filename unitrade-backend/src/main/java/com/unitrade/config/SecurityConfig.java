package com.unitrade.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.unitrade.security.JwtAuthFilter;

@EnableMethodSecurity
@Configuration
public class SecurityConfig {
	
	
	private final JwtAuthFilter jwtAuthFilter;

	public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
	    this.jwtAuthFilter = jwtAuthFilter;
	}

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF for REST APIs
            .csrf(csrf -> csrf.disable())
            
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

            // Enable CORS (uses CorsConfig)
            .cors(cors -> {})

            // 🔴 VERY IMPORTANT: disable default security login
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                // PUBLIC APIs
                .requestMatchers(
                        "/api/auth/**",
                        "/api/colleges/**",
                        "/api/departments/**",
                        "/api/files/upload/**",
                        "/api/verifications/**"
                ).permitAll()
                
                .requestMatchers("/api/products/live").authenticated()
                .requestMatchers("/api/products/student/**").hasAuthority("ROLE_STUDENT")
                .requestMatchers("/api/products/hod/**").hasAuthority("ROLE_HOD")

                // ROLE-BASED APIs
                // NOTE: Spring expects ROLE_HOD / ROLE_ADMIN
                .requestMatchers("/api/hod/**").hasAuthority("ROLE_HOD")
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                

                // Everything else secured
                .anyRequest().authenticated()
               
            );

        return http.build();
    }
}