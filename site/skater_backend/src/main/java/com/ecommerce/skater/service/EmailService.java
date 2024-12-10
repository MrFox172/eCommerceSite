package com.ecommerce.skater.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String text) {
        // send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }

    public void sendVerificationEmail(String to, String token, int id) {
        // send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Welcome to Skater.com – Please Verify Your Account! \uD83D\uDEF9");
        message.setText(String.format("""
        Hi %s,
       
        Thank you for signing up with Skater.com, the ultimate destination for skaters! Before you can start exploring exclusive deals, fresh gear, and everything skateboarding, we need you to verify your email address.
    
        Click the link below to validate your account and complete your registration:
    
        http://localhost:5173/%d/verify/%s
    
        This step helps us ensure your account’s security and makes your experience with us seamless.
    
        If you didn’t sign up for an account with Skater.com, please ignore this email.
    
        Stay rad,
        The Skater.com Team
        """, to,id,token));

        javaMailSender.send(message);
    }

    public void sendOrderConfirmationEmail(String to, String orderNumber, String orderDate, String orderTotal, String expectedDelivery) {
        // send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Skater.com Order Confirmation \uD83D\uDE9A");
        message.setText(String.format("""
        Hi %s,
        
        Your order has been confirmed! Here are the details:
        
        Order Number: %s
        Order Date: %s
        Order Total: $%s
        Expected Delivery: %s
        
        Thank you for shopping with Skater.com! We can’t wait to see you shred in your new gear.
        
        Stay rad,
        The Skater.com Team
        """, to, orderNumber, orderDate, orderTotal, expectedDelivery));

        javaMailSender.send(message);
    }

    public void sendSellerOrderNotificationEmail(String to, String orderNumber, String orderDate, String orderTotal, String expectedDelivery) {
        // send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New Order Alert! \uD83D\uDEA8");
        message.setText(String.format("""
        Hi %s,
        
        You have a new order! Here are the details:
        
        Order Number: %s
        Order Date: %s
        Order Total: $%s
        Expected Delivery: %s
        
        Log in to your Skater.com account to view the order details and fulfill it.
        
        Stay rad,
        The Skater.com Team
        """, to, orderNumber, orderDate, orderTotal, expectedDelivery));

        javaMailSender.send(message);
    }

}
