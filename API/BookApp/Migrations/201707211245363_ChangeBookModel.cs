namespace BookApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeBookModel : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Purchases", newName: "Orders");
            DropColumn("dbo.Books", "Price");
            DropColumn("dbo.Books", "Quantity");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Books", "Quantity", c => c.Int(nullable: false));
            AddColumn("dbo.Books", "Price", c => c.Int(nullable: false));
            RenameTable(name: "dbo.Orders", newName: "Purchases");
        }
    }
}
