package com.anil.peapi;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

public class XMLUpdater {

	public static String updateCodeModuleIdInXML(String xmlContent, String updatedCodeModuleId) throws Exception {
	
		// Convert the XML string to an InputStream for parsing
		InputStream is = new ByteArrayInputStream(xmlContent.getBytes("UTF-8"));

		// Create a DocumentBuilderFactory instance to parse the XML
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document document = builder.parse(is);

		// Update the elements
		updateXML(document,updatedCodeModuleId);

		// Convert the updated document back to a string (for demonstration)
		String updatedXML = documentToString(document);
		System.out.println(updatedXML);
		return updatedXML;
	}

	private static String updatedString(String originalString, String value) {

	
		// Split the original string by the "|" delimiter
		String[] parts = originalString.split("\\|");
		System.out.println("Lengthh of original string "+ parts.length);
		// Check if there are enough parts to replace (in this case, we want to
		// replace the 3rd UUID)
			parts[parts.length-1] = value;
		
		

		// Join the array back into a string with "|" as the delimiter
		String updatedString = String.join("|", parts);

		// Output the updated string
		System.out.println(updatedString);
		return updatedString;

	}

	// Method to update the values of jar_file_url, target_jar, and target_class
	private static void updateXML(Document document,String updatedCodeModuleId) {
		// Update 'jar_file_url' element
		NodeList jarFileUrlNodes = document.getElementsByTagName("jar_file_url");

		if (jarFileUrlNodes.getLength() > 0) {
			String existingurl = jarFileUrlNodes.item(0).getTextContent();
			System.out.println("Existing Url : " + existingurl);
			String updatedurl=updatedString(existingurl,updatedCodeModuleId);
			System.out.println("Updated Url : "+updatedurl);
			// HelloWorld||3|3|{644B7033-041D-45C2-A7A0-024B232C50A4}|{60384E93-0000-C14B-8DEC-FD47C3406DC8}|{60384E93-0000-C416-AD81-F2281118CA55}
			jarFileUrlNodes.item(0).setTextContent(updatedurl);
		}
		 // Update 'target_jar' element
        NodeList targetJarNodes = document.getElementsByTagName("target_jar");
        if (targetJarNodes.getLength() > 0) {
            targetJarNodes.item(0).setTextContent("HelloWorld.jar");
        }
/*
        // Update 'target_class' element
        NodeList targetClassNodes = document.getElementsByTagName("target_class");
        if (targetClassNodes.getLength() > 0) {
            targetClassNodes.item(0).setTextContent("com.newpackage.NewHelloWorld");
        }
        */

	}

	// Helper method to convert a Document to a string (for printing or output)
	private static String documentToString(Document doc) {
		try {
			// Create a transformer for converting the document to a string
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			// Set up pretty-printing options (optional)
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			StringWriter writer = new StringWriter();
			transformer.transform(new DOMSource(doc), new StreamResult(writer));
			return writer.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
