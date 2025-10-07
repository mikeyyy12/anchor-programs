use anchor_lang::prelude::*;

declare_id!("GE3MxRYAUSC44XE71fHgWe5fND1m3DLFAYkn5ijUUnai");

#[program]
pub mod voting {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
