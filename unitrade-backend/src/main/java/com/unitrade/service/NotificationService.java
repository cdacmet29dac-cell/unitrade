package com.unitrade.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.whatsapp.from}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        System.out.println("✅ Twilio initialized");
        System.out.println("FROM NUMBER = " + fromNumber);
    }

    public void sendWhatsApp(String to, String message) {

        try {
            System.out.println("📲 Sending WhatsApp");
            System.out.println("TO = whatsapp:" + to);
            System.out.println("MESSAGE = " + message);

            Message twilioMessage = Message.creator(
                    new PhoneNumber("whatsapp:" + to),
                    new PhoneNumber(fromNumber),
                    message
            ).create();

            // 🔥 THIS IS IMPORTANT
            System.out.println("✅ Message SID: " + twilioMessage.getSid());
            System.out.println("STATUS: " + twilioMessage.getStatus());

        } catch (Exception e) {
            System.out.println("❌ WhatsApp send failed");
            e.printStackTrace();
        }
    }
}
