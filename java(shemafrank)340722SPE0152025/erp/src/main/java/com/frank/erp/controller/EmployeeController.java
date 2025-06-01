package com.frank.erp.controller;

import com.frank.erp.dto.employee.EmployeeRequest;
import com.frank.erp.dto.employee.EmployeeResponse;
import com.frank.erp.dto.employee.EmployeeUpdateRequest;
import com.frank.erp.dto.payslip.PayslipResponse;
import com.frank.erp.model.Employee;
import com.frank.erp.service.EmployeeService;
import com.frank.erp.service.PayslipService;
import org.springframework.core.io.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@Tag(name = "Employee Management", description = "Employee Management API")
@SecurityRequirement(name = "bearerAuth")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final PayslipService payslipService;

    @GetMapping
    @Operation(summary = "Get all employees", description = "Get all employees in the system")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID", description = "Get employee by ID")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER') or @customSecurityExpression.isCurrentUser(#id)")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @GetMapping("/code/{code}")
    @Operation(summary = "Get employee by code", description = "Get employee by code")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<EmployeeResponse> getEmployeeByCode(@PathVariable String code) {
        return ResponseEntity.ok(employeeService.getEmployeeByCode(code));
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get employee by email", description = "Get employee by email")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<EmployeeResponse> getEmployeeByEmail(@PathVariable String email) {
        return ResponseEntity.ok(employeeService.getEmployeeByEmail(email));
    }

    @PostMapping
    @Operation(summary = "Create a new employee", description = "Create a new employee")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<EmployeeResponse> createEmployee(@Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(employeeService.createEmployee(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an employee", description = "Update an employee")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeUpdateRequest request) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an employee", description = "Delete an employee")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @Operation(summary = "Get current employee", description = "Get current employee")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    public ResponseEntity<EmployeeResponse> getCurrentEmployee() {
        return ResponseEntity.ok(employeeService.getCurrentEmployee());
    }

    @GetMapping("/me/pending-payments")
    @Operation(summary = "Get pending salary payments", description = "Get pending salary payments for the current employee")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    public ResponseEntity<List<PayslipResponse>> getPendingPayments() {
        Employee currentEmployee = employeeService.getCurrentEmployeeEntity();
        return ResponseEntity.ok(payslipService.getPendingPayslipsForCurrentEmployee(currentEmployee));
    }

    @GetMapping("/me/payslips/{payslipId}/download")
    @Operation(summary = "Download pay slip", description = "Download pay slip for the current employee")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    public ResponseEntity<Resource> downloadPayslip(
            @PathVariable Long payslipId,
            @RequestParam(defaultValue = "txt") String format) {
        Employee currentEmployee = employeeService.getCurrentEmployeeEntity();
        return payslipService.downloadPayslip(payslipId, currentEmployee, format);
    }
}
