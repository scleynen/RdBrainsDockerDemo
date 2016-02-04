using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RDBrainsDemo.Models;

namespace RDBrainsDemo.Data
{
    public class ProductRepository : IProductRepository
    {
        private static IList<Product> _productList;

        public ProductRepository()
        {
            _productList = new List<Product>();

            _productList.Add(new Product()
            {
                Id = 1,
                Name = "Microsoft Lumia 950",
                Price = 550,
                Description = "Microsoft Lumia 950 - Windows 10..."

            });

            _productList.Add(new Product()
            {
                Id = 2,
                Name = "Iphone 6s",
                Price = 700,
                Description = "IOS 8"

            });


            _productList.Add(new Product()
            {
                Id = 3,
                Name = "Samsung Galaxy S6",
                Price = 550,
                Description = "Android Lollipop"

            });



        }
        public Product Get(int id)
        {
            return _productList.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Product> GetAll()
        {
            return _productList;
        }
    }
}
