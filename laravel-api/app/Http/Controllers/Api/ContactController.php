<?php

namespace App\Http\Controllers\Api;

use App\Models\Contact;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\Http\Controllers\Auth; 

class ContactController extends Controller
{
    public function index()
    {
        //$contacts = Contact::all();
        //$userId = Auth::id();
        $userId = auth()->id();


        $contacts = Contact::where('user_id', $userId)->get();
        
        if ($contacts->count() > 0) {
            return response()->json([
                'status' => 200,
                'contacts' => $contacts
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Contacts Not Found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $userId = auth()->id();
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'title' => 'required|string',
            'profilePicture' => '',
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);
        } else {
            $contact = Contact::create([
                'name' => $request->name,
                'title' => $request->title,
                'profilePicture' => $request->profilePicture,
                'address' => $request->address,
                'phone' => $request->phone,
                'email' => $request->email,
                'user_id' => $userId, 
            ]);

            if ($contact) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Contact Added Successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something Went Wrong!'
                ], 500);
            }

        }

    }

    public function show($id)
    {
        $userId = auth()->id();
        \Log::info('User ID: ' . $userId);

        $contact = Contact::where('id', $id)
                        ->where('user_id', $userId)
                        ->first();

        if ($contact) {
            return response()->json([
                'status' => 200,
                'contact' => $contact
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Contact Not Found!'
            ], 404);
        }
    }

    public function edit($id)
    {
        $contact = Contact::find($id);
        if ($contact) {

            return response()->json([
                'status' => 200,
                'contact' => $contact
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Contact Not Found!'
            ],404);
        }
    }
    
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'title' => 'required|string',
            'profilePicture' => '',
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);

        } else {
            $contact = Contact::find($id);

            if ($contact) {
                $contact->update([
                    'name' => $request->name,
                    'title' => $request->title,
                    'profilePicture' => $request->profilePicture,
                    'address' => $request->address,
                    'phone' => $request->phone,
                    'email' => $request->email,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Contact Updated Successfully'
                ], 200);

            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Contact Not Found!'
                ],404);
            }

        }
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);

        if ($contact) {
            $contact->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Contact Deleted Successfully'
            ], 200);

        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Contact Not Found!'
            ],404);
        }
    }
    
}
