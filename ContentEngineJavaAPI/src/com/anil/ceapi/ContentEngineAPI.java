package com.anil.ceapi;

import com.filenet.api.core.Connection;

public class ContentEngineAPI {

	private static final String CE_URI = "http://10.254.8.22:9081/wsi/FNCEWS40MTOM";
	private static final String USER_NAME = "deadmin";
	private static final String PASSWORD = "Password123";

	public static void main(String[] args) {

		Connection conn=CEConnection.getCEConnection(CE_URI, USER_NAME, PASSWORD);
		CEConnection.getObjectStore(conn,"TOS");

	}

}
