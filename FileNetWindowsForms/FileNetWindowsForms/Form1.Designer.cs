
namespace FileNetWindowsForms
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.url = new System.Windows.Forms.Label();
            this.urlInput = new System.Windows.Forms.TextBox();
            this.userName = new System.Windows.Forms.Label();
            this.password = new System.Windows.Forms.Label();
            this.userNameInput = new System.Windows.Forms.TextBox();
            this.passwordInput = new System.Windows.Forms.TextBox();
            this.getCount = new System.Windows.Forms.Button();
            this.countDisplay = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // url
            // 
            this.url.AutoSize = true;
            this.url.Location = new System.Drawing.Point(35, 13);
            this.url.Name = "url";
            this.url.Size = new System.Drawing.Size(56, 13);
            this.url.TabIndex = 0;
            this.url.Text = "MTOM Url";
            this.url.Click += new System.EventHandler(this.label1_Click);
            // 
            // urlInput
            // 
            this.urlInput.Cursor = System.Windows.Forms.Cursors.Arrow;
            this.urlInput.Location = new System.Drawing.Point(121, 6);
            this.urlInput.Name = "urlInput";
            this.urlInput.Size = new System.Drawing.Size(100, 20);
            this.urlInput.TabIndex = 1;
            // 
            // userName
            // 
            this.userName.AutoSize = true;
            this.userName.Location = new System.Drawing.Point(38, 49);
            this.userName.Name = "userName";
            this.userName.Size = new System.Drawing.Size(57, 13);
            this.userName.TabIndex = 2;
            this.userName.Text = "UserName";
            // 
            // password
            // 
            this.password.AutoSize = true;
            this.password.Location = new System.Drawing.Point(312, 49);
            this.password.Name = "password";
            this.password.Size = new System.Drawing.Size(53, 13);
            this.password.TabIndex = 3;
            this.password.Text = "Password";
            // 
            // userNameInput
            // 
            this.userNameInput.Location = new System.Drawing.Point(121, 46);
            this.userNameInput.Name = "userNameInput";
            this.userNameInput.Size = new System.Drawing.Size(100, 20);
            this.userNameInput.TabIndex = 4;
            // 
            // passwordInput
            // 
            this.passwordInput.Location = new System.Drawing.Point(405, 46);
            this.passwordInput.Name = "passwordInput";
            this.passwordInput.Size = new System.Drawing.Size(100, 20);
            this.passwordInput.TabIndex = 5;
            // 
            // getCount
            // 
            this.getCount.Location = new System.Drawing.Point(41, 113);
            this.getCount.Name = "getCount";
            this.getCount.Size = new System.Drawing.Size(75, 23);
            this.getCount.TabIndex = 6;
            this.getCount.Text = "Get Count";
            this.getCount.UseVisualStyleBackColor = true;
            this.getCount.Click += new System.EventHandler(this.getCountClick);
            // 
            // countDisplay
            // 
            this.countDisplay.Location = new System.Drawing.Point(173, 115);
            this.countDisplay.Name = "countDisplay";
            this.countDisplay.ReadOnly = true;
            this.countDisplay.Size = new System.Drawing.Size(100, 20);
            this.countDisplay.TabIndex = 7;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.countDisplay);
            this.Controls.Add(this.getCount);
            this.Controls.Add(this.passwordInput);
            this.Controls.Add(this.userNameInput);
            this.Controls.Add(this.password);
            this.Controls.Add(this.userName);
            this.Controls.Add(this.urlInput);
            this.Controls.Add(this.url);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label url;
        private System.Windows.Forms.TextBox urlInput;
        private System.Windows.Forms.Label userName;
        private System.Windows.Forms.Label password;
        private System.Windows.Forms.TextBox userNameInput;
        private System.Windows.Forms.TextBox passwordInput;
        private System.Windows.Forms.Button getCount;
        private System.Windows.Forms.TextBox countDisplay;
    }
}

