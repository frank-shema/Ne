package com.frank.erp.dto.payslip;

import com.frank.erp.model.Payslip;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PayslipStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private Payslip.PayslipStatus status;
}