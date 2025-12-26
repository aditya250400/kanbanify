<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberCardController;
use App\Http\Controllers\MyTaskController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/{user}/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // Workspaces
    Route::controller(WorkspaceController::class)->group(function () {
        Route::get('workspaces/create', 'create')->name('workspaces.create');
        Route::post('workspaces/create', 'store')->name('workspaces.store');
        Route::get('workspaces/p/{workspace:slug}/cards', 'show')->name('workspaces.show');
        Route::get('workspaces/edit/{workspace:slug}', 'edit')->name('workspaces.edit');
        Route::put('workspaces/edit/{workspace:slug}', 'update')->name('workspaces.update');
        Route::delete('workspaces/destroy/{workspace:slug}', 'destroy')->name('workspaces.destroy');

        Route::post('workspaces/member/{workspace:slug}/store', 'member_store')->name('workspaces.member.store');
        Route::delete('workspaces/member/{workspace}/destroy/{member}', 'member_destroy')->name('workspaces.member.destroy');
    });

    // Cards
    Route::controller(CardController::class)->group(function () {
        Route::get('workspaces/p/{workspace:slug}/cards/create', 'create')->name('cards.create');
        Route::post('workspaces/p/{workspace:slug}/cards/create', 'store')->name('cards.store');
        Route::get('workspaces/p/{workspace:slug}/cards/detail/{card}', 'show')->name('cards.show');
        Route::get('workspaces/p/{workspace:slug}/cards/edit/{card}', 'edit')->name('cards.edit');
        Route::put('cards/workspaces{workspace:slug}/edit/{card}', 'update')->name('cards.update');
        Route::post('cards/workspaces{workspace:slug}/{card}/reorder', 'reorder')->name('cards.reorder');
        Route::delete('cards/workspaces/{workspace:slug}/destroy/{card}', 'destroy')->name('cards.destroy');
    });

    // Member Card
    Route::controller(MemberCardController::class)->group(function () {
        Route::post('cards/member/{card}/create', 'store')->name('member_card.store');
        Route::delete('card/member/{card}/destroy/{member}', 'destroy')->name('member_card.destroy');
    });

    // attachment
    Route::controller(AttachmentController::class)->group(function () {
        Route::post('cards/attachment/{card}/create', 'store')->name('attachments.store');
        Route::delete('cards/attachment/{card}/destroy/{attachment}', 'destroy')->name('attachments.destroy');
    });

    // task to card
    Route::controller(TaskController::class)->group(function () {
        Route::post('cards/tasks/{card}/create', 'store')->name('tasks.store');
        Route::delete('cards/tasks/{card}/destroy/{task}', 'destroy')->name('tasks.destroy');
        Route::post('cards/tasks/{card}/{task}/item', 'item')->name('tasks.item');
        Route::put('cards/tasks/{card}/{task}/completed', 'completed')->name('tasks.completed');
    });

    // my task
    Route::get('my-tasks', MyTaskController::class)->name('mytasks.index');

    // users
    Route::controller(UserController::class)->group(function () {
        Route::get('users', 'index')->name('users.index');
        Route::get('users/create', 'create')->name('users.create');
        Route::post('users/create', 'store')->name('users.store');
        Route::put('users/edit/{user:email}', 'update')->name('users.update');
        Route::get('users/edit/{user:email}', 'edit')->name('users.edit');
        Route::delete('users/destroy/{user:email}', 'destroy')->name('users.destroy');
    })->middleware(['role:admin']);
});



require __DIR__ . '/auth.php';
