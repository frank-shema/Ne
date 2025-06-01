package com.frank.erp.dto.message;

import com.frank.erp.dto.employee.EmployeeResponse;
import com.frank.erp.model.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {

    private Long id;
    private EmployeeResponse employee;
    private String message;
    private Integer month;
    private Integer year;
    private LocalDateTime createdAt;
    private LocalDateTime sentAt;
    private Message.MessageStatus status;

    public static MessageResponse fromEntity(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .employee(EmployeeResponse.fromEntity(message.getEmployee()))
                .message(message.getMessage())
                .month(message.getMonth())
                .year(message.getYear())
                .createdAt(message.getCreatedAt())
                .sentAt(message.getSentAt())
                .status(message.getStatus())
                .build();
    }
}