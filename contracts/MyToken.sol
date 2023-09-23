// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./interfaces/IERC20.sol";

contract MyToken is IERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 private _totalSupply;
    address public owner;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowance;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        owner = msg.sender;
        _mint(msg.sender, 10 ether);
    }

    function mint(address recipient, uint256 amount) public {
        require(msg.sender == owner, "MyToken: are you not an owner");
        _mint(recipient, amount);
    }

    function _mint(address recipient, uint256 amount) internal {
        _totalSupply += amount;
        _balances[recipient] += amount;

        emit Transfer(address(0), recipient, amount);
    }

    function totalSupply() public view override returns (uint256 total_Supply) {
        total_Supply = _totalSupply;
    }

    function balanceOf(address acount) public view override returns (uint256 balance) {
        balance = _balances[acount];
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        require(_balances[msg.sender] >= amount, "MyToken: Not enough balance");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function allowance(address _owner, address spender) public view override returns (uint256) {
        return _allowance[_owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(_balances[from] >= amount, "MyToken: Insufficient balance");
        require(_allowance[from][msg.sender] >= amount, "MyToken: Insufficient alowance");

        _balances[from] -= amount;
        _balances[to] += amount;

        _allowance[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);

        return true;
    }

    function burn(uint256 amount) public {
        require(_balances[msg.sender] >= amount, "MyToken: Insufficient balance");

        _totalSupply -= amount;
        _balances[msg.sender] -= amount;

        emit Transfer(msg.sender, address(0), amount);
    }
}
