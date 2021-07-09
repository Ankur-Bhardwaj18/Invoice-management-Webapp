package com.higradius;

import java.io.IOException;
import java.util.HashMap;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;
import java.sql.*;
import java.text.*;
import java.util.Date;

//import com.google.gson.Gson;
//import java.sql.*;

@WebServlet("/invoiceServlets")
public class invoiceServlets extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static String url = "jdbc:mysql://localhost:3306/invoice_management";
	private static String uname = "root";
	private static String pass = "Ankita@88123"; 

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<HashMap<String,Object>> result = new ArrayList<HashMap<String,Object>>();
		try {
			Integer start = Integer.parseInt(request.getParameter("start"));
			Integer limit = Integer.parseInt(request.getParameter("limit"));
			String query = "SELECT * FROM mytable LIMIT ?, ?";
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url,uname,pass);
			PreparedStatement st = con.prepareStatement(query);
			st.setInt(1, start);
			st.setInt(2, limit);
			ResultSet rs = st.executeQuery();
			while(rs.next())
			{
				HashMap<String,Object> row = new HashMap<String,Object>();
				row.put("name_customer", rs.getString(1));
				row.put("cust_number", rs.getString(2));
				row.put("invoice_id", rs.getString(3));
				row.put("total_open_amount", rs.getInt(4));
				row.put("due_in_date", rs.getDate(5));
				row.put("clear_date", rs.getDate(6));
				row.put("notes", rs.getString(7));
				result.add(row);
			}
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		Gson gson = new Gson();
		
		
		
		response.getWriter().print(gson.toJson(result));
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		
		try {
			String nameCustomer = request.getParameter("name_customer");
			String custNumber = request.getParameter("cust_number");
			String invoiceId = request.getParameter("invoice_id");
			int totalOpenAmount = Integer.valueOf(request.getParameter("total_open_amount"));
			DateFormat fromat = new SimpleDateFormat("dd-MM-yyyy");
			Date dueInDate = fromat.parse(request.getParameter("due_in_date"));
			String notes = request.getParameter("notes");
			
			System.out.println("Hello World");
//			response.getWriter().print(""+ nameCustomer + " - " +custNumber + " - ");
			
			String query = "INSERT INTO mytable values(?, ?, ?, ?, ?, ?, ?)";
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url, uname, pass);
			
					PreparedStatement stmt=con.prepareStatement(query);  
					
					stmt.setString(1, nameCustomer);//1 specifies the first parameter in the query  
					stmt.setString(2,custNumber);
					stmt.setString(3, invoiceId);
					stmt.setInt(4, totalOpenAmount);
					stmt.setDate(5, java.sql.Date.valueOf(request.getParameter("due_in_date")));
					stmt.setDate(6, null);
					stmt.setString(7, notes);
					  
					int i=stmt.executeUpdate();  
					System.out.println(i+" records inserted");  
					  
					con.close();
					
//					response.getWriter().print("Data Inserted Successfully");
					
		}catch(Exception e) {
			System.out.println(e.toString());  
			e.printStackTrace();
			response.getWriter().print("Some Server Error Occurred. Please try again ");
		}
		
	}

}

