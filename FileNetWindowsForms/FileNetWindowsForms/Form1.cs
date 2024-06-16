using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using FileNet.Api.Authentication;
using FileNet.Api.Collection;
using FileNet.Api.Core;
using FileNet.Api.Query;
using FileNet.Api.Util;

namespace FileNetWindowsForms
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private async void getCountClick(object sender1, EventArgs e)
        {


            Console.WriteLine("Button Clicked");
            try
            {
                // to bypass the ssl ccertificate check
                ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
                // Set connection parameters; substitute for the placeholders.
                String uri = "https://ibmdemo16:9443/wsi/FNCEWS40MTOM/";
                String username = "p8admin";
                String password = "Password1";
                countDisplay.Text = "Connecting to FileNet";
                // Get client context.
                IConnection conn = Factory.Connection.GetConnection(uri);
                UsernameCredentials creds = new UsernameCredentials(username, password);
                ClientContext.SetProcessCredentials(creds);

                // Get default domain.
                IDomain domain = Factory.Domain.FetchInstance(conn, null, null);
                Console.WriteLine("Domain: " + domain.Name);
                countDisplay.Text = "Connection Success";
                // Get object stores for domain.
                foreach (IObjectStore store in domain.ObjectStores)
                {
                    Console.WriteLine("Object store: " + store.Name);
                }
               
                Console.WriteLine("Connection to Content Platform Engine successful");
                IObjectStore os = Factory.ObjectStore.FetchInstance(domain, "Case Target", null);
                Console.WriteLine(os.Name);
                await ExtractDocumentsAsync(os);

            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.ToString());
            }

           
           
            Console.WriteLine("Done");
            

        }
        private async Task ExtractDocumentsAsync(IObjectStore os)
        {
            // Connect to external repository and extract documents
            // This is where your lengthy operation should happen
            await Task.Run(() =>
            {
                // Code to connect to external repository and extract documents
                // Replace this with your actual extraction logic
                getDocument(os);
            });

            // After extraction is complete (if needed), update UI or do other tasks
            MessageBox.Show("Document extraction complete!");
        }

        public  void getDocument(IObjectStore os)
        {

            SearchSQL sqlObject = new SearchSQL();

            string myClassName = "PropertyTemplate";
            //sqlObject.SetSelectList("DocumentTitle");
            sqlObject.SetFromClauseInitialValue(myClassName, null, true);

           // string containsExpression = "'FileNet'";
           // sqlObject.SetContainsRestriction(myClassName, containsExpression);

            // Displays the SQL statement.
            Console.WriteLine("SQL: " + sqlObject.ToString());

            // Executes the content search.
            SearchScope searchScope = new SearchScope(os);
            IRepositoryRowSet rowSet = searchScope.FetchRows(sqlObject, null, null, true);

            IEnumerator iterator = rowSet.GetEnumerator();
            int count = 0;
            while (iterator.MoveNext())
            {
                count++;
                Console.WriteLine(count);
                Thread.Sleep(1000);
                // countDisplay.Text = count.ToString();
                UpdateCount(count);
            }
            Console.WriteLine("Total count :" + count);
        }
        private void UpdateCount(int count)
        {
            if (countDisplay.InvokeRequired)
            {
                // We are not on the UI thread, invoke the update
                countDisplay.Invoke((MethodInvoker)(() => UpdateCount(count)));
            }
            else
            {
                // Update the textbox with the count
                countDisplay.Text = count.ToString();
            }
        }
    }
}
