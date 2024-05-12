package com.anil.caseapi;

import com.ibm.casemgmt.api.Case;

public class CaseManagementAPI {
	private static final String CE_URI = "http://10.254.8.22:9081/wsi/FNCEWS40MTOM";
	private static final String USER_NAME = "deadmin";
	private static final String PASSWORD = "Password123";
	public static String tos="TOS";
	public static String solutionName="Credit Card Application";
	public static String caseType="CCA_NewCreditCardApplication";
	//public static String solutionName="Health Insurance Application";


	public static void main(String[] args) {
		// Get the Filenet and Case managemenet context connection to initialize te connection
		CaseManagementConnection.getConnection(CE_URI, USER_NAME, PASSWORD);
		// do all the operations
		CaseManagementUtility cutil=new CaseManagementUtility();
		//cutil.getSolutionCaseTypes(tos, solutionName);
		//cutil.createCase(tos, solutionName, caseType);
		
		// Update a case 
		Case c=cutil.retrieveCaseByCaseIdentifier(tos, solutionName, "CCA_NewCreditCardApplication_000000310001");
		cutil.getWobNumById( tos,  solutionName,c.getId().toString());
		// close the connections
		CaseManagementConnection.closeConnection();
	}
}
