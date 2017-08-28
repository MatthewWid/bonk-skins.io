<div id="signup-modal" class="modal disabled">
	<div class="modal-bg"></div>
	<div class="modal-container">
		<div class="modal-header">
			<span class="modal-title">Sign Up</span>
			<span class="modal-close">x</span>
		</div>
		<div class="modal-content">
			<form id="signup-form" class="user-form" autocomplete="off">
					<div class="user-section">
						<label class="user-text" for="username">Username</label>
						<input class="user-input" type="text" name="username" placeholder="Required" autocomplete="username" minlength="3" maxlength="16" required />
					</div>
					<div class="user-section">
						<label class="user-text" for="password">Password</label>
						<input class="user-input" type="password" name="password" placeholder="Required" autocomplete="new-password" minlength="8" maxlength="24" required />
					</div>
					<div class="user-section">
						<label class="user-text" for="email">Email</label>
						<input class="user-input" type="email" name="email" placeholder="Optional" autocomplete="email" />
					</div>
					<div class="user-section">
						<p id="signup-output" class="user-error hidden">SERVER RESPONSE</p>
					</div>
					<input class="user-submit" type="submit" value="Create my account" />
			</form>
		</div>
	</div>
</div>
<div id="login-modal" class="modal disabled">
	<div class="modal-bg"></div>
	<div class="modal-container">
		<div class="modal-header">
			<span class="modal-title">Log In</span>
			<span class="modal-close">x</span>
		</div>
		<div class="modal-content">
			<form id="login-form" class="user-form" autocomplete="off">
					<div class="user-section">
						<label class="user-text" for="username">Username</label>
						<input class="user-input" type="text" name="username" placeholder="Required" autocomplete="username" required />
					</div>
					<div class="user-section">
						<label class="user-text" for="password">Password</label>
						<input class="user-input" type="password" name="password" placeholder="Required" autocomplete="new-password" required />
					</div>
					<div class="user-section">
						<p id="login-output" class="user-error hidden">SERVER RESPONSE</p>
					</div>
					<input class="user-submit" type="submit" value="Log in" />
			</form>
		</div>
	</div>
</div>