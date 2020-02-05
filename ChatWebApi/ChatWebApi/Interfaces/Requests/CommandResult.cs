using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Interfaces.Requests
{
    public class CommandResult
    {

    }

    public class CommandCreateResult : CommandResult 
    {
        public int Id { get; }

        public CommandCreateResult(int key)
        {
            Id = key;
        }
    }
}
