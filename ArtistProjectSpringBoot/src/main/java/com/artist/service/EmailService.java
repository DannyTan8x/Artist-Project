package com.artist.service;

public interface EmailService {
    
    
    public void sendPasswordResetEmail(String email, String resetLink);


}
