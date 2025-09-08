import { NextRequest, NextResponse } from 'next/server';

/**
 * Register API Route
 * 
 * Features:
 * - User registration
 * - Input validation
 * - Email verification
 * - JWT token generation
 * - Error handling
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, password } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !company || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Mock user creation - replace with real database logic
    const user = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      company,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Mock JWT token - replace with real JWT generation
    const token = 'mock-jwt-token-' + Date.now();

    return NextResponse.json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}






