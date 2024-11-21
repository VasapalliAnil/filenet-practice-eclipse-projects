package com.anil.peapi;

import filenet.vw.api.VWSession;

public class ProcessEngineAPI {
	private static final String CE_URI = "http://ibmdemo16:9080/wsi/FNCEWS40MTOM";
	private static final String USER_NAME = "P8admin";
	private static final String PASSWORD = "Password1";
	private static final String CODEMODULE_ID="{60384E93-0000-C416-AD81-F2281118CA55}";
	public static void main(String[] args) throws Exception {
		
		// TODO Auto-generated method stub
		String connectionPoint="WFCP";
		VWSession vwSession=PEConnection.getVWSession( CE_URI, USER_NAME, PASSWORD, connectionPoint);
		// process Engine Utility
		ProcessEngineUtility peu=new ProcessEngineUtility();
		
		// get all the queuenmes
		//peu.getQueueNames(vwSession);
		//peu.getRosterNames(vwSession);
		//peu.getWorkItemInRosterUsingCustomProperty( vwSession,"CreditCardApplication", "CCA_ApplicationNumber","HDFC_000000160003");
		//peu.getWorkItemInRosterUsingCustomProperty( vwSession,"CreditCardApplication", "F_WobNum","6B944B0CF84B5241BDF2C05F760E5FAA");
		//peu.unlockWorkItems( vwSession,"CreditCardApplication", "F_WobNum","6B944B0CF84B5241BDF2C05F760E5FAA");
		//peu.getCurrentQueue( vwSession,"CreditCardApplication", "F_WobNum","A125ADEB86EEA244944CA7F4C57FD920");
		peu.updateCQWithCodeModule(vwSession,CODEMODULE_ID,"HelloWorld");
		
	}

}
