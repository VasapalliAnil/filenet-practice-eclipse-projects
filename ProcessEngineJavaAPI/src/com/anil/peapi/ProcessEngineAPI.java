package com.anil.peapi;

public class ProcessEngineAPI {
	private static final String CE_URI = "http://10.254.8.22:9081/wsi/FNCEWS40MTOM";
	private static final String USER_NAME = "deadmin";
	private static final String PASSWORD = "Password123";
	public static void main(String[] args) {
		
		// TODO Auto-generated method stub
		String connectionPoint="TOS_Default_ConnPt";
		PEConnection.getVWSession( CE_URI, USER_NAME, PASSWORD, connectionPoint);

	}

}
