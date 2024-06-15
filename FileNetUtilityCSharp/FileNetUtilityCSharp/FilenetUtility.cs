
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using FileNet.Api.Authentication;
using FileNet.Api.Core;
using FileNet.Api.Util;

namespace FileNetUtilityCSharp
{
    class FilenetUtility
    {

        static void Main(string[] args)
        {
            try
            {
                // to bypass the ssl ccertificate check
                ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
                // Set connection parameters; substitute for the placeholders.
                String uri = "https://ibmdemo16:9443/wsi/FNCEWS40MTOM/";
                String username = "p8admin";
                String password = "Password1";

                // Get client context.
                IConnection conn = Factory.Connection.GetConnection(uri);
                UsernameCredentials creds = new UsernameCredentials(username, password);
                ClientContext.SetProcessCredentials(creds);

                // Get default domain.
                IDomain domain = Factory.Domain.FetchInstance(conn, null, null);
               Console.WriteLine("Domain: " + domain.Name);

                // Get object stores for domain.
                foreach (IObjectStore store in domain.ObjectStores)
                {
                    Console.WriteLine("Object store: " + store.Name);
                }
                Console.WriteLine("Connection to Content Platform Engine successful");
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.ToString());
            }
        }
    }
}
