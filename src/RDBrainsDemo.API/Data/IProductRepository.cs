using RDBrainsDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RDBrainsDemo.Data
{
    public interface IProductRepository
    { 

        IEnumerable<Product> GetAll();

        Product Get(int id);
    }
}
