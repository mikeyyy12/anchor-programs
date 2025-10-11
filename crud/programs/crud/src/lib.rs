use anchor_lang::prelude::*;

declare_id!("CnrrWu9XDxHnQcJmRLY22c1KWW8uRy6Ao3WtFfWwgweZ");

#[program]
pub mod crud {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
